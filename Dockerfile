FROM rust:1-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && cargo install mdbook --locked

WORKDIR /src

COPY book.toml ./
COPY src ./src

RUN mdbook build

FROM nginx:alpine

COPY --from=builder /src/book/ /usr/share/nginx/html/

EXPOSE 80
