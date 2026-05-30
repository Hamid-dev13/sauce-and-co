# ─── SAUCE&CO — Make targets ───────────────────────────────
# Usage:
#   make help        Voir toutes les commandes
#   make up          Build + run en prod (Docker, port 3000)
#   make dev         Mode dev local (npm, hot reload)
#   make logs        Suivre les logs du container

.DEFAULT_GOAL := help
PROJECT := sauce-and-co
PORT := 3000

# ─── Dev local ─────────────────────────────────────────────

.PHONY: install
install: ## Installer les dépendances npm
	npm ci

.PHONY: dev
dev: ## Lancer le serveur de dev (npm run dev, port 3000)
	npm run dev

.PHONY: build
build: ## Build la version prod (next build)
	npm run build

.PHONY: start
start: ## Lancer la version prod en standalone (sans Docker)
	node .next/standalone/server.js

.PHONY: lint
lint: ## Lint le code
	npm run lint

# ─── Docker (prod) ─────────────────────────────────────────

.PHONY: up
up: ## Build + run le container Docker (port 3000)
	docker compose up -d --build

.PHONY: down
down: ## Stopper et supprimer le container
	docker compose down

.PHONY: restart
restart: ## Redémarrer le container (sans rebuild)
	docker compose restart

.PHONY: rebuild
rebuild: ## Rebuild from scratch + run (no cache)
	docker compose build --no-cache && docker compose up -d

.PHONY: logs
logs: ## Suivre les logs en live
	docker compose logs -f $(PROJECT)

.PHONY: ps
ps: ## Voir le statut du container
	docker compose ps

.PHONY: shell
shell: ## Ouvrir un shell dans le container
	docker compose exec $(PROJECT) sh

.PHONY: stats
stats: ## Voir la consommation CPU / RAM
	docker stats $(PROJECT) --no-stream

# ─── Maintenance ───────────────────────────────────────────

.PHONY: clean
clean: ## Nettoyer node_modules + .next
	rm -rf node_modules .next

.PHONY: clean-docker
clean-docker: ## Supprimer container + image Docker
	docker compose down --rmi local --volumes

.PHONY: deploy
deploy: ## Déploiement rapide sur VPS (git pull + rebuild)
	git pull && docker compose up -d --build && docker compose logs --tail 30 $(PROJECT)

# ─── Help ──────────────────────────────────────────────────

.PHONY: help
help: ## Afficher l'aide
	@echo ""
	@echo "  \033[1;31mSAUCE&CO\033[0m — commandes disponibles"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
