USE
trend;

CREATE VIEW keyword_view AS
SELECT *
FROM keyword
WHERE ranking <= 20
  AND ranking >= 1;