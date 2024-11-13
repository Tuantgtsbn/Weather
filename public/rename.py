import os

def rename_images_in_folder(folder_path):
    # Lấy danh sách tất cả các file trong thư mục
    files = os.listdir(folder_path)
    
    # Lọc chỉ lấy các file ảnh (dựa trên đuôi file)
    image_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))]
    
    # Duyệt qua từng file ảnh và đổi tên
    for index, filename in enumerate(image_files, start=1):
        if "@2x" in filename:
            # Tạo đường dẫn đầy đủ đến file ảnh và xóa nó
            file_path = os.path.join(folder_path, filename)
            os.remove(file_path)
            print(f"Đã xóa file: {filename}")
            continue
        # Tạo đường dẫn đầy đủ đến file ảnh cũ
        old_file_path = os.path.join(folder_path, filename)
        
        # Lấy đuôi file ảnh (phần mở rộng)
        file_extension = os.path.splitext(filename)[1]
        
        # Tạo tên mới cho file theo cấu trúc "prefix_index.extension"
        new_filename = f"{filename.split('_')[0]}{file_extension}"
        new_file_path = os.path.join(folder_path, new_filename)
        
        # Đổi tên file
        os.rename(old_file_path, new_file_path)
        print(f"Đã đổi tên '{filename}' thành '{new_filename}'")

# Sử dụng hàm
folder_path = 'D:\LearnWeb\Clock\public\weather-icon'  # Thay bằng đường dẫn đến thư mục ảnh
rename_images_in_folder(folder_path)
