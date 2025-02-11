import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'

const app = express()

const {
  PORT,
  AUTH_SERVICE,
  TEST_SERVICE,
  PROBLEM_SERVICE,
  BADGE_SERVICE,
  COMPILER_SERVICE,
  COLLABORATION_SERVICE,
  COMMUNITY_SERVICE,
  CONTEST_SERVICE,
  SECURITY_NUMBER,
  COMMAND
} = process.env

// const services = [{
//     path: AUTH_SERVICE,
//     route: '/auth'
// }, {
//     path: TEST_SERVICE,
//     route: '/test'
// }, {
//     path: PROBLEM_SERVICE,
//     route: '/problem'
// }, {
//     path: BADGE_SERVICE,
//     route: '/badge'
// }, {
//     path: COMPILER_SERVICE,
//     route: '/compiler'
// }, {
//     path: COLLABORATION_SERVICE,
//     route: '/collaboration'
// },
// {
//     path: COMMUNITY_SERVICE,
//     route: '/api/community'
// }, {
//     path: CONTEST_SERVICE,
//     route: '/contest'
// }
// ]

//LOGGING 
app.use(morgan('dev'))

app.use((req, res, next) => {
  console.log(`LOGGING 📝 : ${req.method} request to: ${req.originalUrl}`);
  next();
});

const BOOLEAN = 1 + 2 == Number(SECURITY_NUMBER)

// services.forEach((service) => {
//     const isCollaboration = service.route === '/collaboration'
//     app.use(service?.route, createProxyMiddleware({
//         target: service?.path,
//         changeOrigin: true,
//         ws: isCollaboration
//     }))
// })

// services.forEach((service) => {
//     if (service.path) {
//         app.use(service.route, createProxyMiddleware({
//             target: service.path,
//             changeOrigin: true,  // Set this to true always
//             ws: service.route === '/collaboration'
//         }))
//     }
// });



if (AUTH_SERVICE) {
  app.use('/auth', createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true
  }));
}

//   if (TEST_SERVICE) {
//     app.use('/test', createProxyMiddleware({
//       target: TEST_SERVICE,
//       changeOrigin: true
//     }));
//   }

app.use('/test', createProxyMiddleware({
  target: "http://test-service-srv:5001",
  changeOrigin: true,
}));




app.use('/problem', createProxyMiddleware({
  target: "http://problem-service-srv:5002",
  changeOrigin: true
}));



app.use('/badge', createProxyMiddleware({
  target: "http://badge-service-srv:5003",
  changeOrigin: true
}));



app.use('/compiler', createProxyMiddleware({
  target: "http://compiler-service-srv:5004",
  changeOrigin: true
}));



app.use('/collaboration', createProxyMiddleware({
  target: "http://collaboration-service-srv:5005",
  changeOrigin: true,
  ws: true  // WebSocket support
}));


app.use('/api/community', createProxyMiddleware({
  target: "http://community-service-srv:5006",
  changeOrigin: true
}));



app.use('/contest', createProxyMiddleware({
  target: "http://contest-service-srv:5007",
  changeOrigin: true
}));





app.use(
  "/",
  createProxyMiddleware({
    target: "http://frontend-srv:3000",
    changeOrigin: true,
  })
);

app.get('/', (req, res) => {
  res.json(COMMAND)
})


// app.get('/services', (req, res) => {
//     res.json(
//         services
//     )
// })

app.listen(PORT, () => {
  console.log(`ATOMICA RUNNING ON http://localhost:${PORT} 🍃`);
})
