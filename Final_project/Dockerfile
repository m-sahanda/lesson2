# Використовуємо офіційний образ Playwright, який вже містить усі необхідні браузери та залежності
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json для встановлення залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо решту файлів проекту
COPY . .

# За замовчуванням запускаємо тести
CMD ["npm", "test"]
