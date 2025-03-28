import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // ✅ Đảm bảo đây là Standalone Component
  imports: [
    CommonModule,  // ✅ Import CommonModule để dùng *ngIf
    FormsModule,   // ✅ Import FormsModule để dùng ngModel
    IonicModule    // ✅ Import IonicModule để nhận diện các component ion-*
  ]
})
export class Tab1Page {
  currentTime: string = '';

  showTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  async sendNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Thời gian hiện tại',
          body: `Bây giờ là ${this.currentTime}`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
        },
      ],
    });
    alert(`Thông báo: Bây giờ là ${this.currentTime}`);
  }

  async shareTime() {
    await Share.share({
      title: 'Chia sẻ thời gian',
      text: `Thời gian hiện tại là: ${this.currentTime}`,
      dialogTitle: 'Chia sẻ thời gian',
    });
  }

  async captureScreen() {
    try {
      const imageData = 'data:image/png;base64,...'; // Dữ liệu hình ảnh base64 (cần thay thế bằng dữ liệu thực tế)
      const fileName = `screenshot-${Date.now()}.png`;
      await Filesystem.writeFile({
        path: fileName,
        data: imageData,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      alert('Ảnh chụp màn hình đã được lưu!');
    } catch (error) {
      console.error('Lỗi khi lưu ảnh chụp màn hình:', error);
    }
  }
}
