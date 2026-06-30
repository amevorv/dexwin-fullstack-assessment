# Findings

- Duplicate user registration is now blocked with a dedicated conflict exception and handled by the API exception handler.
- Authentication input validation is present for required username/password fields.
- CORS is restricted to the expected frontend origins instead of using a wildcard.
- The frontend now handles failed API requests and shows an error state rather than failing silently.
- Password handling remains weak because authentication uses a plain SHA-256 hash without a salt or a dedicated password hashing library. This should be upgraded to BCrypt or Argon2.
- The registration endpoint returns a full User object, which can expose the hashed password in the response body.
- The backend is returning entity objects directly from controllers, which increases the risk of leaking sensitive fields and makes the API contract harder to evolve safely.
- The frontend API client hard-codes the backend URL, which makes local/dev/staging configuration brittle.
- The UI currently provides only a simple loading/error message and does not use a richer loading state or skeleton experience for slower network conditions.
- The app does not yet have a proper authenticated session flow or route protection on the frontend.
- There is no pagination, filtering, or search refinement for projects/tasks, which will become a problem as the dataset grows.
- Observability is still minimal; the application has no structured logging, request tracing, or audit events for auth and task operations.
- There is no automated frontend test coverage, and the current backend coverage is focused on a narrow authentication path.
- The earlier SQL injection concern is not currently applicable because the JPA query path uses bound parameters rather than string concatenation.