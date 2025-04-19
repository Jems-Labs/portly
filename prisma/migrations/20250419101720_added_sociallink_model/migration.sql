-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('GITHUB', 'DRIBBBLE', 'MEDIUM', 'X', 'LINKEDIN', 'YOUTUBE', 'FIGMA', 'INSTAGRAM', 'FACEBOOK', 'THREADS', 'GUMROAD');

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
