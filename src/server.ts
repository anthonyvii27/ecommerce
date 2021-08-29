import { app } from './app';
import { ApplicationEnvironment } from '@settings/index';

const PORT: number = parseInt(ApplicationEnvironment.Port as string, 10);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));