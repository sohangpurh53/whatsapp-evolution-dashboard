import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface SendLocationFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendLocationForm = ({ config }: SendLocationFormProps) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendLocation/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          name,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Location"
      description="Share a location with coordinates"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="number">Phone Number</Label>
        <Input
          id="number"
          placeholder="559999999999"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Location Name</Label>
        <Input
          id="name"
          placeholder="Bora Bora"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="French Polynesian"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            placeholder="-16.505538"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            placeholder="-151.742277"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>
    </ApiFormBase>
  );
};
