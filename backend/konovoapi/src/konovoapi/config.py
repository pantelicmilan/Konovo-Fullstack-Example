from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    auth_username: str
    auth_password: str
 
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# Instanciraj jednom i koristi globalno
settings = Settings()