-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cookingTime" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "kilocalories" INTEGER,
    "ingredients" JSONB[],
    "steps" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
