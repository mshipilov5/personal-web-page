from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import requests
from starlette.middleware.cors import CORSMiddleware

# Настройки приложения
VK_CLIENT_ID = "52878284"
VK_CLIENT_SECRET = "4ek6b2d3rNraFJvfbl9m"
VK_REDIRECT_URI = "https://maksimshipilov.ru/"
DATABASE_URL = "sqlite:///./test.db"  # Строка подключения к SQLite базе данных

# Настройка базы данных
Base = declarative_base()

# Создание синхронного движка для SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}, echo=True)

# Создание сессии для работы с SQLite
SessionLocal = sessionmaker(
    bind=engine, class_=Session, expire_on_commit=False
)

# Модель пользователя
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    vk_id = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)

# FastAPI приложение
app = FastAPI(root_path="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все домены или только определенные
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Pydantic модель для запроса
class CallbackRequest(BaseModel):
    access_token: str

# Функция для создания сессии
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Обработчик колбека
@app.post("/vk/callback")
async def vk_callback(request: CallbackRequest, db: Session = Depends(get_db)):
    access_token = request.access_token
    # Получение информации о пользователе
    user_response = requests.post(
        "https://id.vk.com/oauth2/user_info",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "client_id": VK_CLIENT_ID,
            "access_token": access_token,
        },
    ).json()
    print(user_response)
    if "error" in user_response:
        raise HTTPException(status_code=400, detail="Failed to fetch user info")

    user_info = user_response["user"]
    
    user_id = user_info["user_id"]
    first_name = user_info["first_name"]
    last_name = user_info["last_name"]

    # Сохранение пользователя в базе данных
    user = db.query(User).filter(User.vk_id == user_id).first()

    if not user:
        user = User(
            vk_id=user_id,
            first_name=first_name,
            last_name=last_name,
        )
        db.add(user)
        db.commit()

    return {
        "message": "User registered successfully",
        "user": {
            "vk_id": user.vk_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
    }

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)