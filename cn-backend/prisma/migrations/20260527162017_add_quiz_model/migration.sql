-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correctAns" TEXT NOT NULL,
    "module" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
