"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileConfig() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>

        {/* Navegación Tabs simulada */}
        <div className="flex space-x-6 border-b border-zinc-700 pb-4">
          <span className="font-semibold border-b-2 border-white pb-1">Profile</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Auth</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Avatar</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Connections</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Notifications</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Stores & Streaming</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer">Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulario de la izquierda */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Username</Label>
              <Input disabled value="Username" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Given name</Label>
                <Input placeholder="First name" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div>
                <Label className="text-white">Family name</Label>
                <Input placeholder="Last name" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Email address</Label>
              <Input type="email" value="user@example.com" className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Location</Label>
                <Input placeholder="Location" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
              <div>
                <Label className="text-white">Website</Label>
                <Input placeholder="Website" className="bg-zinc-800 border-zinc-700 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Bio</Label>
              <Textarea rows={4} placeholder="Tell us about yourself..." className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Pronoun</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select pronoun" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                  <SelectItem value="they">They / Them</SelectItem>
                  <SelectItem value="he">He / Him</SelectItem>
                  <SelectItem value="she">She / Her</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Posters</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Replies</Label>
              <Select>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Anyone" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                  <SelectItem value="anyone">Anyone</SelectItem>
                  <SelectItem value="followers">Followers Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="include-profile" defaultChecked />
              <Label htmlFor="include-profile" className="text-white">Include profile in the Members section</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="adult-content" />
              <Label htmlFor="adult-content" className="text-white">Adult content</Label>
            </div>
            <Button className="mt-4 bg-zinc-700 hover:bg-zinc-600">Save Changes</Button>
          </div>

          {/* Sección de favoritos */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Favorite Films</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className="h-36 flex items-center justify-center border-dashed border-2 border-zinc-700 bg-zinc-800"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-4xl text-zinc-400">＋</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
