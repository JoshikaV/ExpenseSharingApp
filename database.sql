-- Create Expense table
CREATE TABLE "Expense" (
    "id" TEXT PRIMARY KEY,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ExpenseSplit table
CREATE TABLE "ExpenseSplit" (
    "id" TEXT PRIMARY KEY,
    "expenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE
);

-- Create index on expenseId for better query performance
CREATE INDEX "ExpenseSplit_expenseId_idx" ON "ExpenseSplit"("expenseId");

-- Create function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updatedAt
CREATE TRIGGER update_expense_updated_at
    BEFORE UPDATE ON "Expense"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expense_split_updated_at
    BEFORE UPDATE ON "ExpenseSplit"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 