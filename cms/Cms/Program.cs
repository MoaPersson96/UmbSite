WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddComposers()
    .AddDeliveryApi()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseRouting();

// 🔥 VIKTIGT: use default cors (inte named policy)
app.UseCors();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
    });

await app.RunAsync();