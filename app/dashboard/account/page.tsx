"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePasswordSchema, changeEmailSchema } from "@/app/lib/validations";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Card from "@/app/components/ui/Card";

type PasswordForm = z.infer<typeof changePasswordSchema>;
type EmailForm = z.infer<typeof changeEmailSchema>;

export default function AccountPage() {
  const router = useRouter();

  // Change Password
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");
  const pwForm = useForm<PasswordForm>({ resolver: zodResolver(changePasswordSchema) });

  async function onChangePassword(data: PasswordForm) {
    setPwMsg(""); setPwErr("");
    const res = await fetch("/api/account/change-password", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setPwErr(json.error); return; }
    setPwMsg(json.message);
    pwForm.reset();
  }

  // Change Email
  const [emMsg, setEmMsg] = useState("");
  const [emErr, setEmErr] = useState("");
  const emForm = useForm<EmailForm>({ resolver: zodResolver(changeEmailSchema) });

  async function onChangeEmail(data: EmailForm) {
    setEmMsg(""); setEmErr("");
    const res = await fetch("/api/account/change-email", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setEmErr(json.error); return; }
    setEmMsg(json.message);
    emForm.reset();
  }

  // Delete Account
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteErr, setDeleteErr] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function onDelete() {
    setDeleteErr("");
    setDeleting(true);
    const res = await fetch("/api/account/delete", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: deletePassword }),
    });
    setDeleting(false);
    if (!res.ok) {
      const json = await res.json();
      setDeleteErr(json.error);
      return;
    }
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl tracking-wide text-text-primary">
        Account Settings<span className="text-crimson">.</span>
      </h1>

      {/* Change Email */}
      <Card>
        <h2 className="font-sans text-lg font-semibold text-text-primary mb-4">Change Email</h2>
        <form onSubmit={emForm.handleSubmit(onChangeEmail)} className="space-y-4 max-w-md">
          <Input id="new-email" label="New Email" type="email" error={emForm.formState.errors.email?.message} {...emForm.register("email")} />
          <Input id="em-password" label="Current Password" type="password" error={emForm.formState.errors.password?.message} {...emForm.register("password")} />
          {emErr && <p className="text-sm text-crimson-light font-sans">{emErr}</p>}
          {emMsg && <p className="text-sm text-emerald-400 font-sans">{emMsg}</p>}
          <Button type="submit" loading={emForm.formState.isSubmitting} size="sm">Update Email</Button>
        </form>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="font-sans text-lg font-semibold text-text-primary mb-4">Change Password</h2>
        <form onSubmit={pwForm.handleSubmit(onChangePassword)} className="space-y-4 max-w-md">
          <Input id="current-pw" label="Current Password" type="password" error={pwForm.formState.errors.currentPassword?.message} {...pwForm.register("currentPassword")} />
          <Input id="new-pw" label="New Password" type="password" placeholder="Min. 8 characters" error={pwForm.formState.errors.newPassword?.message} {...pwForm.register("newPassword")} />
          {pwErr && <p className="text-sm text-crimson-light font-sans">{pwErr}</p>}
          {pwMsg && <p className="text-sm text-emerald-400 font-sans">{pwMsg}</p>}
          <Button type="submit" loading={pwForm.formState.isSubmitting} size="sm">Update Password</Button>
        </form>
      </Card>

      {/* Delete Account */}
      <Card className="border-red-900/50">
        <h2 className="font-sans text-lg font-semibold text-red-400 mb-2">Delete Account</h2>
        <p className="text-sm text-text-muted font-sans mb-4">
          This will permanently delete your account and all associated data, including your beta key. This action cannot be undone.
        </p>
        {!showDelete ? (
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
            Delete My Account
          </Button>
        ) : (
          <div className="space-y-4 max-w-md">
            <Input
              id="delete-pw"
              label="Confirm your password"
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            {deleteErr && <p className="text-sm text-crimson-light font-sans">{deleteErr}</p>}
            <div className="flex gap-3">
              <Button variant="danger" size="sm" loading={deleting} onClick={onDelete}>
                Permanently Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowDelete(false); setDeletePassword(""); setDeleteErr(""); }}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
