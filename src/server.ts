import { ApplicationEnvironment } from "@settings/index";

import { app } from "./app";

const PORT: number = parseInt(ApplicationEnvironment.Port as string, 10);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
