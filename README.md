\# QueueWise

Smart Queue and Service-Time Optimization Platform



QueueWise is a digital queue management platform designed to reduce waiting time and improve service efficiency across multiple organizations, including hospitals, banks, restaurants, government offices, airports and shopping malls.



The platform allows visitors to join queues digitally, receive unique queue tokens and track their queue position and estimated waiting time. It also provides administrators with queue monitoring and service management capabilities.



\## Problem Statement



Traditional queue management systems often involve long physical queues, inefficient service allocation and a lack of transparency regarding waiting times.



QueueWise aims to address these challenges through digital token generation, real-time queue monitoring and service-time estimation.



\## Key Features



\- \*\*Digital Token Generation:\*\* Visitors can register for a service and receive a unique queue token.

\- \*\*Queue Tracking:\*\* Visitors can check their token status and queue position.

\- \*\*Waiting-Time Estimation:\*\* Estimates waiting time using historical average or default service durations.

\- \*\*Queue Management:\*\* Administrators can monitor tokens and update their status.

\- \*\*Peak-Hour Analytics:\*\* Provides hourly queue-volume information and identifies peak hours.

\- \*\*Multiple Organizations:\*\* Supports different service categories such as hospitals, banks, restaurants, government offices, airports and shopping malls.

\- \*\*Service Management:\*\* Organizes visitors according to their selected services.



\## Technology Stack



| Component | Technology |

|---|---|

| Frontend | React.js |

| Build Tool | Vite |

| Backend | Python, FastAPI |

| Database | SQLite |

| ORM | SQLAlchemy |

| API Documentation | Swagger UI |



\## Project Structure



```text

smart-queue-management/

│

├── backend/

│   ├── main.py

│   ├── database.py

│   ├── models.py

│   ├── schemas.py

│   └── requirements.txt

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── App.jsx

│   │   ├── App.css

│   │   ├── index.css

│   │   └── main.jsx

│   ├── package.json

│   └── vite.config.js

│

├── .gitignore

└── README.md

```



\## Getting Started



\### Prerequisites



\- Python 3.10 or later

\- Node.js and npm

\- Git



\### 1. Clone the Repository



```bash

git clone https://github.com/Pratiksha-152006/smart-queue-management.git

cd smart-queue-management

```



\### 2. Set Up the Backend



Open a terminal:



```bash

cd backend

python -m venv venv

```



Activate the virtual environment.



\*\*Windows PowerShell:\*\*



```powershell

.\\venv\\Scripts\\Activate.ps1

```



Install the dependencies:



```bash

pip install -r requirements.txt

```



Start the backend:



```bash

uvicorn main:app --reload --host 0.0.0.0 --port 8000

```



Backend URL:



`http://localhost:8000`



API documentation:



`http://localhost:8000/docs`



\### 3. Set Up the Frontend



Open a second terminal:



```bash

cd frontend

npm install

npm run dev

```



Frontend URL:



`http://localhost:5173`



Ensure the frontend API configuration points to the correct backend URL before running the application.



\## Backend API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/` | Backend welcome message |

| GET | `/health` | Health check |

| POST | `/tokens` | Generate a queue token |

| GET | `/queue` | Retrieve all queue tokens |

| GET | `/queue/status` | Retrieve queue statistics |

| GET | `/queue/position/{token\_number}` | Check queue position |

| PATCH | `/tokens/{token\_number}/status` | Update token status |

| GET | `/tokens/{token\_number}` | Retrieve token details |

| GET | `/tokens/{token\_number}/estimate` | Estimate waiting time |

| GET | `/analytics/peak-hours` | Retrieve peak-hour analytics |



\## Queue Token Statuses



\- \*\*Waiting:\*\* Visitor is waiting for service.

\- \*\*Serving:\*\* Visitor is currently being served.

\- \*\*Completed:\*\* Service has been completed.

\- \*\*Cancelled:\*\* Queue token has been cancelled.



\## Future Enhancements



\- Dynamic staff allocation based on service demand.

\- Multiple service counters with service-specific assignments.

\- More advanced waiting-time prediction.

\- Notifications through SMS and WhatsApp.

\- Improved analytics and demand forecasting.



\## Team



Developed as a hackathon project.



\*\*Repository:\*\* \[QueueWise – Smart Queue Management](https://github.com/Pratiksha-152006/QueueWise)





