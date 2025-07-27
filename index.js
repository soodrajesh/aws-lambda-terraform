// Helper function to create a response
const createResponse = (statusCode, body, headers = {}) => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            ...headers
        },
        body: typeof body === 'string' ? body : JSON.stringify(body, null, 2)
    };
};

// Handle CORS preflight requests
const handleCors = (event) => {
    if (event.requestContext?.http?.method === 'OPTIONS') {
        return createResponse(200, {});
    }
    return null;
};

// Generate HTML for the homepage
const generateHomepage = (event) => {
    const baseUrl = `https://${event.requestContext?.domainName || 'your-api-endpoint'}`;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AWS Lambda Web App</title>
        <style>
            :root {
                --primary: #2b6cb0;
                --secondary: #4299e1;
                --background: #f7fafc;
                --text: #2d3748;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: var(--text);
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f0f4f8;
            }
            .container {
                margin: 2rem auto;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                background: white;
                text-align: center;
            }
            h1 {
                color: var(--primary);
                margin-bottom: 1.5rem;
                font-size: 2.2rem;
            }
            .subtitle {
                color: var(--secondary);
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
            }
            .info-box {
                background: var(--background);
                padding: 1.5rem;
                border-radius: 8px;
                margin: 1.5rem 0;
                text-align: left;
            }
            .endpoint {
                background: #e6fffa;
                padding: 0.75rem 1rem;
                border-radius: 6px;
                font-family: monospace;
                word-break: break-all;
                margin: 0.5rem 0;
                display: block;
                border-left: 4px solid #38b2ac;
            }
            .time {
                font-size: 0.9rem;
                color: #718096;
                margin-top: 2rem;
                font-style: italic;
            }
            .emoji {
                font-size: 2.5rem;
                display: block;
                margin-bottom: 1rem;
            }
            .code {
                background: #f0f0f0;
                padding: 0.2rem 0.4rem;
                border-radius: 3px;
                font-family: monospace;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji" role="img" aria-label="rocket">🚀</div>
            <h1>Welcome to Your AWS Lambda Web App</h1>
            <p class="subtitle">A serverless application deployed with Terraform</p>
            
            <div class="info-box">
                <p>This application is running on AWS Lambda with API Gateway in the <strong>${process.env.AWS_REGION || 'eu-west-1'}</strong> region.</p>
                <p>Try these endpoints:</p>
                
                <div class="endpoint">
                    <strong>GET</strong> <a href="/api/hello" target="_blank">/api/hello</a><br>
                    <small>A simple greeting from the API</small>
                </div>
                
                <div class="endpoint">
                    <strong>GET</strong> <a href="/api/health" target="_blank">/api/health</a><br>
                    <small>Check the health status of the API</small>
                </div>
                
                <div class="endpoint">
                    <strong>GET</strong> /api/example/{id}<br>
                    <small>Example endpoint with path parameter</small>
                </div>
            </div>
            
            <div class="time">
                Server time: ${new Date().toISOString()}<br>
                Environment: <span class="code">${process.env.NODE_ENV || 'development'}</span>
            </div>
        </div>
    </body>
    </html>`;
};

// Route handlers
const routes = {
    'GET /': async (event) => {
        return createResponse(200, generateHomepage(event), { 'Content-Type': 'text/html' });
    },
    
    'GET /api/hello': async () => {
        return createResponse(200, {
            message: 'Hello from AWS Lambda!',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            region: process.env.AWS_REGION || 'eu-west-1'
        });
    },
    
    'GET /api/health': async () => {
        return createResponse(200, {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'development'
        });
    },
    
    'GET /api/example/:id': async (event) => {
        const id = event.pathParameters?.id || 'unknown';
        return createResponse(200, {
            id,
            message: `You requested example with ID: ${id}`,
            timestamp: new Date().toISOString()
        });
    }
};

exports.handler = async (event) => {
    // Log the incoming event for debugging
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Handle CORS preflight
    const corsResponse = handleCors(event);
    if (corsResponse) return corsResponse;
    
    // Extract HTTP method and path
    const httpMethod = event.requestContext?.http?.method || 'GET';
    const path = event.rawPath || '/';
    
    // Try to find a matching route
    let routeKey = `${httpMethod} ${path}`;
    let handler = routes[routeKey];
    
    // If no exact match, try to match parameterized routes
    if (!handler && path.startsWith('/api/')) {
        const pathParts = path.split('/');
        if (pathParts.length > 2) {
            const basePath = pathParts.slice(0, 3).join('/'); // Get first two parts of the path
            const paramRoute = `${httpMethod} ${basePath}/:id`;
            if (routes[paramRoute]) {
                handler = routes[paramRoute];
                // Add path parameters to the event
                event.pathParameters = event.pathParameters || {};
                event.pathParameters.id = pathParts[3];
            }
        }
    }
    
    // Execute the handler if found
    if (handler) {
        try {
            return await handler(event);
        } catch (error) {
            console.error('Error handling request:', error);
            return createResponse(500, { 
                error: 'Internal Server Error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
    
    // Handle 404 Not Found
    return createResponse(404, { 
        error: 'Not Found',
        message: `The requested path ${path} was not found.`,
        availableEndpoints: Object.keys(routes).map(route => route.split(' ')[1])
    });
};
