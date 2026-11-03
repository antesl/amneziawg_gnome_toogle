# amneziawg_gnome_toogle

Расширение для Gnome, которое добавляет индикатор в трей для AmneziaWG

Управление и состояние. 

Работает на Ubuntu 26.04

### Установка:

1) Ставим gnome-shell-extension-manager
```bash
sudo apt install -y gnome-shell-extension-manager
```
2) Клонируем репозиторий 
```bash
git clone git@github.com:antesl/amneziawg_gnome_toogle.git
```
3) Сохраняем файл 
```bash
cd amneziawg_gnome_toogle && cp quick-amnezia@antesl.net/extension.js ~/.local/share/gnome-shell/extensions/quick-amnezia@antesl.net/extension.js
```
4) Перезапускаем gdm
```bash
sudo systemctl restart gdm 
```
5) Потом заходим в extension-manager
```bash
extension-manager
```
И там включаем расширение

