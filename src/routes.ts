import { CustomerController } from "@controllers/CustomerController";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "@repository/customerRepository";
import { Router } from "express";

const prismaClient = new PrismaClient();

const customerRepository = new CustomerRepository(prismaClient);

const customerController = new CustomerController(
    prismaClient,
    customerRepository
);

const router = Router();

router.post(
    "/auth/register",
    customerController.register.bind(customerController)
);

export { router };
