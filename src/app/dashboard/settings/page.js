"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Bell, Shield, Palette, Layout } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your bookmark experience.</p>
      </div>

      <div className="grid gap-6">
          <Card className="glass-card">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Palette size={20} className="text-primary" />
                      Appearance
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                      <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Always active for premium experience</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full flex items-center px-1">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                      </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                      <div>
                          <p className="font-medium">Glassmorphism Intensity</p>
                          <p className="text-sm text-muted-foreground">Adjust the blur and transparency</p>
                      </div>
                      <div className="text-sm font-bold text-primary">High</div>
                  </div>
              </CardContent>
          </Card>

          <Card className="glass-card">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Bell size={20} className="text-primary" />
                      Notifications
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Manage how you receive updates and alerts.</p>
                  <Button variant="outline" className="w-full justify-start gap-2">
                      <Bell size={16} />
                      Configure Alert Preferences
                  </Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
