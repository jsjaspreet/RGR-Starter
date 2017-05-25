SHELL := /bin/bash
app_network := ragstarter_app

migration: ## Create a new migration for Postgres.
	touch sql/migrations/V$(shell date +"%s")__$(file).sql

migrate: ## Run all migrations against Postgres.
	@docker run --rm --net ${app_network} -v `pwd`/sql:/flyway/sql shouldbee/flyway -location=`pwd`/sql -url=jdbc:postgresql://postgres:5432/ideas -user=postgres -password=secret migrate

clean-db: ## Clean Postgres Database.
	@docker run --rm --net ${app_network} -v `pwd`/sql:/flyway/sql shouldbee/flyway -location=`pwd`/sql -url=jdbc:postgresql://postgres:5432/ideas -user=postgres -password=secret clean
