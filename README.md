In my case, I used docker to containerize them and utilize different ports due to other projects running on my device.
You may need to install docker if you don't have yet. Install Docker Desktop here https://docs.docker.com/desktop/install/windows-install/
## Docker
docker-compose up -d

![docker-success-all-started running](https://github.com/qjrincoywork/task_management_system/assets/61674249/8749e648-9af3-4fa1-8d82-988c207d5493)

## Composer install
composer install --ignore-platform-req=ext-xml --ignore-platform-req=ext-dom --ignore-platform-req=ext-xmlwriter --ignore-platform-req=ext-curl
## Run Migration
php artisan migrate

![artisan-migrate](https://github.com/qjrincoywork/task_management_system/assets/61674249/2936764a-38c7-4d6b-a335-ac3b5a99c184)

php artisan serve

![artisan-serve](https://github.com/qjrincoywork/task_management_system/assets/61674249/3f1a89f7-403b-4d91-8102-fb4dd697b71f)

## NPM Install
cd task-management-ui
npm install
npm run dev
![npm-run-dev-in-the-ui-directory](https://github.com/qjrincoywork/task_management_system/assets/61674249/eb461d99-eb7e-4370-81e4-1910de3a90cc)
## Note 
Please don't forget to modify/create env files.
## Once Up and Running it will look like the images below
**Register Page**
![RegisterPage](https://github.com/qjrincoywork/task_management_system/assets/61674249/50d81ba9-6ed7-4b39-8f5e-dde1cbd9df4c)
**Login Page**
![LoginPage](https://github.com/qjrincoywork/task_management_system/assets/61674249/d7d88dff-ef05-4fd0-bd05-a68a059d5cd2)
**Dashboard or Tasks page**
![TasksPage](https://github.com/qjrincoywork/task_management_system/assets/61674249/4888c543-4b7e-4062-b11e-3e101c850839)
**Creation of task**
![AddTask](https://github.com/qjrincoywork/task_management_system/assets/61674249/9f9be996-4315-4e20-9305-27bddbd7a720)
**Editing of task**
![EditTask](https://github.com/qjrincoywork/task_management_system/assets/61674249/63150f12-13cb-4581-9cad-d75ec542b1c4)
**Deletion of task**
![DeleteTask](https://github.com/qjrincoywork/task_management_system/assets/61674249/67a3d045-a61f-430a-a330-cf67803782a2)

