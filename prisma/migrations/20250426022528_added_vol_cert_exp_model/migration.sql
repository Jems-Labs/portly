-- CreateTable
CREATE TABLE "VolunteerExperience" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "fromMonth" TEXT NOT NULL,
    "fromYear" INTEGER NOT NULL,
    "isCurrentlyWorking" BOOLEAN NOT NULL DEFAULT false,
    "toMonth" TEXT,
    "toYear" INTEGER,
    "userId" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "VolunteerExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issueMonth" TEXT NOT NULL,
    "issueYear" INTEGER NOT NULL,
    "expirationMonth" TEXT,
    "expirationYear" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VolunteerExperience" ADD CONSTRAINT "VolunteerExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
