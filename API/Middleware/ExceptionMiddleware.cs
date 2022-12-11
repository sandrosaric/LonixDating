
using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
                                    IHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
            
        }

        public async Task InvokeAsync(HttpContext httpContext){
            try{
                await _next(httpContext);
            }
            catch(Exception ex){
                _logger.LogError(ex,ex.Message);
                httpContext.Response.ContentType = "application/json";
                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                 ? new APIException(httpContext.Response.StatusCode,
                                    ex.Message,
                                    ex.StackTrace?.ToString())
                : new APIException(httpContext.Response.StatusCode,
                                    ex.Message,
                                    "Internal Server Error");

                var options = new JsonSerializerOptions{
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var jsonResponse = JsonSerializer.Serialize(response,options);

                await httpContext.Response.WriteAsync(jsonResponse);
                
            }
        }
    }
}