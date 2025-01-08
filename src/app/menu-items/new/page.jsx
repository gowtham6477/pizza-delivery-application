"use client";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);

  const handleFormSubmit = async (ev, data) => {
    ev.preventDefault();
    console.log("Submitted Data:", data);
    console.log("Category ID:", data.category);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        const error = await response.json();
        reject(error.error || "Error saving item!");
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Item saved",
      error: "Error saving item!",
    });
    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
