"""Print a random local service credential. Do not commit or share its output."""
import secrets
print(secrets.token_urlsafe(32))
