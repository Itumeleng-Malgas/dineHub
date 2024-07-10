# DineHub App
 Welcome to DineHub, the ultimate platform for restaurants to register, manage, and operate efficiently. This README provides an overview of the DineHub app, instructions on how to get started, and details on its various features.

# Table of Contents
* Introduction
* Features
* Data Model
* Installation
* Usage
* Screenshots
* Contributing
* License
* Support

# Introduction
 DineHub is designed to streamline restaurant operations, making it easier for restaurant owners and managers to register their establishments, manage reservations, menu items, and customer interactions. With a user-friendly interface and powerful backend, DineHub ensures a seamless experience for both restaurant staff and customers.

# Features
 * Restaurant Registration: Simple and straightforward registration process for restaurants.
 * Menu Management: Easily add, update, and remove menu items.
 * Reservation System: Manage customer reservations efficiently.
 * Order Management: Track and manage orders in real-time.
 * Customer Interaction: Engage with customers through feedback and promotions.
 * Analytics Dashboard: Gain insights into restaurant performance with detailed analytics.
 * Multi-Platform Support: Available on both iOS and Android devices.

# Data Model


# Installation and setup
To successfully use DineHub you will need to install both and setup both Front-end and Back-end components. 
This section will guide you on that.
## Back-end 
To install and setup the backend REST_API server build with flask you need to follow these steps:
### Git clone DineHub Repository
---
### Clone the DineHub Repository
To get started, you need to clone the DineHub repository. Follow these steps:

1. Open your terminal or command prompt.
2. Change your current directory to the desired location where you want to clone the repository.
3. Run the following command to clone the repository:
    ```
    git clone https://github.com/Itumeleng-Malgas/dineHub.git
    ```

Once the repository is cloned, you can proceed with the installation and setup of both the front-end and back-end components.

### install python3 on your system
---

The backend is build with python. so you need to install python3 to do that:
### 1) install python3 on your system
The backend is built with Python, so you need to install Python3 to proceed. Follow the instructions below based on your operating system:

##### - Windows:
1. Head over to the [Python official website](https://www.python.org/downloads/windows/) and download the latest version of Python for Windows.
2. Run the installer and select the option to add Python to your system's PATH.
3. Follow the prompts to complete the installation.

##### - Linux:
1. Open a terminal.
2. Run the following command to install Python3:
    ```
    sudo apt-get update
    sudo apt-get install python3
    ```

##### - macOS:
1. Open a terminal.
2. Install Homebrew by running the following command:
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
3. Once Homebrew is installed, run the following command to install Python3:
    ```
    brew install python3
    ```

After installing Python, you can proceed with next step.


### Install Python Libraries
To install the required Python libraries for the backend, follow these steps:

1. Open your terminal or command prompt.
2. Change your current directory to the backend folder by running the following command:
    ```
    cd /home/cyanide/dineHub/backend
    ```
3. Once you are inside the backend folder, run the following command to install the required libraries from the `requirements.txt` file:
    ```
    pip3 install -r requirements.txt
    ```

This will install all the necessary Python libraries for the DineHub backend.

### DineHub Database Setup
---
### DineHub Database Setup

To set up the DineHub database, follow these steps:

NB: you need to have any relational database management software installed such as MySQL, Postgres etc. for our case we will use MySQL

1. Open your terminal or command prompt.
2. Change your current directory to the backend setup folder by running the following command:
    ```
    cd /home/cyanide/dineHub/backend/setup
    ```
3. Once you are inside the setup folder, run the following command to import the database schema:
    ```
    cat setup_mysql_dev.sql | mysql -u username -p
    ```
   Replace `username` with your MySQL username.
4. You will be prompted to enter the password for your MySQL account. Enter the password and press Enter.

This command will import the DineHub database schema into your MySQL server and create a new dinehub user which will be used as the main point of interacting with the database.


### starting DineHub Rest API Server
---
To start the DineHub REST API server, run the following command:

```
DINEHUB_MYSQL_PWD='dinehub_dev_pwd' DINEHUB_MYSQL_USER='dine_hub_dev' DINEHUB_TYPE_STORAGE='db' DINEHUB_MYSQL_DB='dineHub_dev_db' DINEHUB_MYSQL_HOST='localhost' python3 -m api.v1.app

```

This command will start the DineHub REST API server and allow you to interact with the backend functionality of the application.

### Environmental Variables

Before starting the DineHub REST API server, make sure you have the following environmental variables set up correctly:

1. `DINEHUB_MYSQL_PWD`: The password for your MySQL account.
2. `DINEHUB_MYSQL_USER`: The username for your MySQL account.
3. `DINEHUB_TYPE_STORAGE`: The type of storage to be used (e.g., `db` for database).
4. `DINEHUB_MYSQL_DB`: The name of the MySQL database for DineHub.
5. `DINEHUB_MYSQL_HOST`: The host address for your MySQL server.

Ensure that these environmental variables are properly configured before running the command to start the DineHub REST API server.



Remember to make sure you have all the necessary environment variables set up correctly before running the command.

### Interact with DineHub Rest API Server via Endpoints
---

Interaction with the DineHub Rest API server via API Endpoints

for the full documentation of Dine Hub Rest API its Endpoints and methods consult the following endpoints

- [DineHub REST API Documentation](https://documenter.getpostman.com/view/15626998/2sA3e48TYY
)📝
 
## Front-end

# Usage

* Registration
1. Open the DineHub app.
2. Tap on the "Register" button.
3. Fill in the required details such as restaurant name, address, contact information, and operating hours.
4. Submit the form to complete the registration process.

* Menu Management
1. Navigate to the "Menu" section from the dashboard.
2. Add new menu items by tapping the "Add Item" button.
3. Edit or remove existing items as needed.

* Reservation System
1. Access the "Reservations" section.
2. View upcoming reservations and manage them accordingly.
3. Confirm, cancel, or reschedule reservations as per customer requests.

* Order Management
1. Go to the "Orders" tab.
2. Track real-time orders and update their status (e.g., preparing, ready, delivered).
3. Ensure timely and efficient order fulfillment.

* Customer Interaction
1. Use the "Feedback" feature to receive and respond to customer reviews.
2. Send promotions and special offers through the "Promotions" tab.

# Contributing
🤝 We welcome contributions to enhance the DineHub app. To contribute:

1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature or bugfix.
3. 📝 Commit your changes.
4. 🚀 Push your branch and create a pull request.
5. 🕵️‍♀️ Changes will be reviewed by our team and if validated, you become an official contributor to DineHub.

Let's work together to make DineHub even better! 🎉

We welcome contributions to enhance the DineHub app. To contribute:

* Fork the repository.
1. Create a new branch for your feature or bugfix.
2. Commit your changes.
3. Push your branch and create a pull request.
4. Changes will be reviewed by our team and if validated, Hurrey you become an official contributor to DineHub

# License
The license for DineHub is:

- [MIT License](https://opensource.org/licenses/MIT) 📜
- [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html) 🐧






# Support
If you need any assistance or have any questions regarding the DineHub app, please feel free to reach out to our support team. We are here to help!

You can contact our support team:

* Nonkululeko “Yandah” Khanyile (Yandah1) <nonku.yandah@gmail.com>
* Itumeleng Malgas (Itumeleng-Malgas) <aaron.tumi@live.co.za>
* Chukwuebuka Kennedy Anyaeji (KennyChukwuebuka) <kenkinado@gmail.com>
* Tekoh Palma (Matrix30) <tekohpalma@gmail.com>

Our support team is available 24/7 and will respond to your inquiries as soon as possible. We strive to provide the best possible support experience to ensure your satisfaction with the DineHub app.
