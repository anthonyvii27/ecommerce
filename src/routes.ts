import { CustomerController } from "@controllers/CustomerController";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prismaClient = new PrismaClient();

const customerController = new CustomerController(prismaClient);

const router = Router();

router.post(
    "/auth/register",
    customerController.register.bind(customerController)
);

export { router };
