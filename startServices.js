const { exec } = require('child_process');

const startService = (path) => {
    exec(`cd ${path} && npm start`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error starting service at ${path}: ${err}`);
            return;
        }
        console.log(`Service at ${path} started successfully`);
        console.log(stdout);
        console.error(stderr);
    });
};

startService('WeatherDataService');
startService('UserManagementService');
startService('FavoriteWeatherService');