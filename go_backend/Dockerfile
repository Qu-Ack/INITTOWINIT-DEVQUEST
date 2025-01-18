FROM golang:1.20-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy

# Copy the source code and the scripts into the container
COPY . .

COPY scripts ./scripts

RUN chmod +x ./scripts/build.sh

# Run the build script to both build and run the Go binary
RUN ./scripts/build.sh

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/main .

COPY --from=builder /app/.env .

EXPOSE 8080

CMD ["./main"]

