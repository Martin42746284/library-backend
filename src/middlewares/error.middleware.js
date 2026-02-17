/**
 * Middleware global de gestion des erreurs
 * Doit être le DERNIER middleware déclaré dans app.js
 */
export function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err.message);

  // Erreur personnalisée avec code HTTP
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  }

  // Erreur PostgreSQL (clé dupliquée, contrainte, etc.)
  if (err.code) {
    return res.status(400).json({
      success: false,
      message: err.detail || 'Database error'
    });
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}
