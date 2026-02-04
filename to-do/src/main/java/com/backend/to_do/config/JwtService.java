package com.backend.to_do.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 *
 * Handling token information
 */
@Service
public class JwtService {

    private static final String SECRET_KEY = "cqBS9ZuIgCTQyayvoI023EMz1+w4okW6n8r0W0J4LpU=";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific value from the JWT's claims 
     * after it is parsed and verified
     * @param <T> The type of value being extracted
     * @param token JWT
     * @param claimsResolver function that maps the Claims object to the specified value
     * @return The extracted claim value 
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Builds a JJWT parser, verifies the JWT signature,
     *  and then return the claims if valid
     * @param token JWT
     * @return The JWT claims (payload)
     */
    private Claims extractAllClaims(String token) {
        return Jwts
            .parser() //creates the JWT parser builder
            .verifyWith(getSignInKey()) //specify the key used to verify the tokens signature
            .build() //finalize the parser config/rules
            .parseSignedClaims(token) //parse and verify the token's signature
            .getPayload(); //extract after successful verification
    }

   /**
    * Decodes the Base64 encoded SECRET_KEY
    *  and creates a SecretKey for JWT signing and verification
    * @return the SecretKey used to sign and verify JWTs
    */
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

   public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
   }
   
   public boolean isTokenExpired(String token) {
        //is the tokens exp date before current date
        return extractExpiration(token).before(new Date());
   }

   private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
   }

   public String generateToken(Map<String, Object>extraClaims, UserDetails userDetails) {
        return Jwts
            .builder()
            .claims(extraClaims)
            .subject(userDetails.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
            .signWith(getSignInKey(), Jwts.SIG.HS256)
            .compact();
   }

   public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
   }
}
