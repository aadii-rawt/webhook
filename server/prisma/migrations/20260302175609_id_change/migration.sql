-- DropForeignKey
ALTER TABLE "response" DROP CONSTRAINT "response_id_fkey";

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "webhook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
