down:
	docker compose down

up:
	docker compose up -d

rebuild:
	docker compose up -d --build
migrar:
	docker exec spotpeeker-backend python manage.py makemigrations
	docker exec spotpeeker-backend python manage.py migrate
logs:
	###### ######### ###### ###### ######### ############ ######### ############ ######### ######
	###### ######### ###### ###### FRONTEN LOGS ############ ######### ############ ######### 
	######### ###### ###### ######### ############ ######### ############ ######### ######
	docker logs --tail=30 spotpeeker-frontend | tail -n 30

	
	###### ######### ###### ###### ######### ############ ######### ############ ######### ######
	###### ######### ###### ###### BACKEND LOGS ############ ######### ############ ######### 
	######### ###### ###### ######### ############ ######### ############ ######### ######
	docker logs --tail=30 spotpeeker-backend | tail -n 30
	###### ######### ###### ###### ######### ############ ######### ############ ######### ######
	###### ######### ###### ######################## ############ ######### ############ ######### 
	######### ###### ###### ######### ############ ######### ############ ######### ######
	
	
off-off:
	docker compose down
	poweroff
	
commit-and-push:
	read -p "Mensaje del commit: " mensaje; \
	git add .; \
	git commit -m "$$mensaje"; \
	git push origin main
	
