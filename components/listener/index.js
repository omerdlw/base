"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/modules/toast/hooks";
import { globalEvents, EVENT_TYPES } from "@/lib/events";

export function GlobalListener() {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = globalEvents.subscribe(
      EVENT_TYPES.API_UNAUTHORIZED,
      () => {
        toast.error("Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.");
      }
    );

    const unsubForbidden = globalEvents.subscribe(
      EVENT_TYPES.API_FORBIDDEN,
      () => {
        toast.warning("Bu işlemi gerçekleştirmek için yetkiniz yok.");
      }
    );

    const unsubError = globalEvents.subscribe(EVENT_TYPES.API_ERROR, (data) => {
      toast.error(data?.message || "Beklenmedik bir hata oluştu.");
    });

    const unsubOffline = globalEvents.subscribe(
      EVENT_TYPES.NETWORK_OFFLINE,
      () => {
        toast.info("İnternet bağlantısı koptu. İşlemleriniz kuyruğa alındı.");
      }
    );

    const unsubOnline = globalEvents.subscribe(
      EVENT_TYPES.NETWORK_ONLINE,
      () => {
        toast.success("Bağlantı sağlandı. Kuyruktaki işlemler tamamlanıyor.");
      }
    );

    return () => {
      unsubAuth();
      unsubForbidden();
      unsubError();
      unsubOffline();
      unsubOnline();
    };
  }, [toast, router]);

  return null;
}
