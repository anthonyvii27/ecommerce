import { AuthController } from "@controllers/AuthController";
import { CustomerController } from "@controllers/CustomerController";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "@repository/customerRepository";
import { Router } from "express";

const prismaClient = new PrismaClient();

const customerRepository = new CustomerRepository(prismaClient);

const customerController = new CustomerController(customerRepository);
const authController = new AuthController(customerRepository);

const router = Router();

router.post("/register", customerController.register.bind(customerController));

router.post(
    "/auth/authenticate",
    authController.authenticate.bind(customerController)
);

export { router };
