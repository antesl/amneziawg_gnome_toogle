# amneziawg_gnome_toogle
Расширение для Gnome, которое добавляет индикатор в трей для AmneziaWG
Управление и состояние. 

Работает на Ubuntu 26.04

Ставим gnome-shell-extension-manager
sudo apt install -y gnome-shell-extension-manager

Клонируем репозиторий 
git clone git@github.com:antesl/amneziawg_gnome_toogle.git

Сохраняем файл 
cd amneziawg_gnome_toogle && cp quick-amnezia@antesl.net/extension.js ~/.local/share/gnome-shell/extensions/quick-amnezia@antesl.net/extension.js

Перезапускаем gdm
sudo systemctl restart gdm 

Потом заходим в extension-manager
extension-manager

И там включаем расширение

