# Playwright Python image (includes Chromium and OS dependencies)
FROM mcr.microsoft.com/playwright/python:v1.41.0-jammy

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the scraper code
COPY . .

# Run the scraper in an infinite loop, sleeping for 6 hours (21600 seconds) between runs
CMD ["python", "scraper_engine.py"]