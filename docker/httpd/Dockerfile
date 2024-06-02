FROM httpd:2.4.48

# Update package index and install necessary packages
RUN apt update \
    && apt -y install --no-install-recommends git \
    && apt -y install --no-install-recommends \
        apache2 \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Set owner of web files to Apache user
RUN chown -R www-data:www-data /app
