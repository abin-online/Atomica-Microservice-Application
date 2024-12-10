auth-service/src/
│
├── controller/                            # Handles HTTP request logic
│   └── userController.ts                  # Controller responsible for user-related endpoints
│
├── entities/                              # Defines database entities or schemas
│   ├── otp.ts                             # Entity related to OTP (One Time Password)
│   └── user.ts                            # Defines user entity schema
│
├── framework/                             # Framework utilities such as routes, database config, and middleware
│   ├── api/                                 
│   │   ├── config/                          
│   │   │   └── db.ts                       # Handles database connection settings
│   │   │
│   │   ├── middleware/                      
│   │   │   └── token.ts                    # Middleware logic for handling JWT token validation
│   │   │
│   │   ├── routes/                         
│   │   │   └── userRoute.ts                # Defines the HTTP routes for user signup, login, etc.
│   │   │
│   │   └── injections/                      
│   │       └── injections.ts               # Dependency injection configuration
│   │
│   └── database/                            
│       ├── mongodb/                        
│       │   ├── model/                     
│       │   │   ├── otpModel.ts            # MongoDB model for OTP
│       │   │   └── userModel.ts           # MongoDB model for users
│       │   │
│       │   └── repository/                
│       │       ├── otpRepository.ts      # Repository logic for OTP-related DB operations
│       │       └── userRepository/       
│       │           ├── userRepository.ts  # User-specific database logic
│       │           └── user/             
│       │               ├── block.ts      # Logic for user block/unblock functionality
│       │               ├── createUser.ts # Handles user creation logic
│       │               ├── findByEmail.ts # Logic to find users by email
│       │               ├── getAllUser.ts  # Fetch all users
│       │               └── getUser.ts     # Fetch a single user by ID
│       │
│       └── repositoryInterface/           
│           ├── otpRepository.ts           # Interface definition for OTP repository
│           └── userRepository.ts          # Interface definition for user repository
│
├── services/                                 # Services for reusable logic
│   ├── hashPassword.ts                      # Handles password hashing logic
│   ├── jwt.ts                               # Handles JWT token creation and validation
│   ├── otpGenerator.ts                      # Handles OTP generation logic
│   └── sendEmail.ts                         # Handles sending emails to users
│
├── types/                                     # Shared types used across the application
│   └── serverTypes.ts                        # Common server type definitions
│
├── usecases/                                   # Use case layer implementing business logic
│   ├── interface/                            
│   │   ├── respositoryInterface/            
│   │   │   ├── otpRepository.ts            # Defines the interface for OTP repository operations
│   │   │   └── userRepository.ts           # Defines the interface for user repository operations
│   │   │
│   │   └── service/                          
│   │       ├── hashPassword.ts             # Handles service-related password logic
│   │       ├── jwt.ts                      # Handles JWT logic
│   │       ├── otpGenerate.ts              # OTP generation service logic
│   │       └── sentEmail.ts                # Email service logic
│   │
│   ├── middlewares/                         
│   │   ├── catchError.ts                   # Middleware for catching runtime errors
│   │   ├── errorHandler.ts                 # General error handling logic
│   │   └── errorMiddleware.ts              # General middleware for managing errors
│   │
│   └── usecases/                             
│       └── usecases/                         
│           └── userUseCase.ts               # Business logic for user-related use cases
│           └── user/                       
│               ├── createUser.ts           # Handles the user creation logic
│               ├── signup.ts               # Handles signup-related operations
│               └── login.ts                # Handles login-related operations
