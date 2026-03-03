-- DropForeignKey
ALTER TABLE "response" DROP CONSTRAINT "response_webhookId_fkey";

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_id_fkey" FOREIGN KEY ("id") REFERENCES "webhook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
