export const verifyToken = (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json('Se requiere un token' );
    }
  
    try {
      const decodedToken = Jwt.verify(token, JWT_SECRET);
      const { exp } = decodedToken;
  
      if (Date.now() >= exp * 1000) {
        return res.status(401).json( 'Token ha expirado' );
      }
      return res.status(200).json(true)
    } catch (error) {
      return res.status(401).json('Token invalido' );
    }
  };