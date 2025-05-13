const deploymentUrl = import.meta.env.VITE_DEPLOYMENT_URL;
const localhost = import.meta.env.VITE_LOCALHOST;
const port = import.meta.env.VITE_PORT;

const localhostaddress = localhost + ":" + port;

const backendUrl = `${deploymentUrl || localhostaddress}`;

export default backendUrl;
