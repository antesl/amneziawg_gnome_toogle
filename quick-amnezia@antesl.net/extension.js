import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import St from 'gi://St';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const AmneziaIndicator = GObject.registerClass(
class AmneziaIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.5, 'AmneziaWG Toggle', false);

        this.box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });

        this.icon = new St.Icon({
            icon_name: 'network-vpn-symbolic',
            style_class: 'system-status-icon'
        });
        
        this.box.add_child(this.icon);
        this.add_child(this.box);

        let startItem = new PopupMenu.PopupMenuItem('Включить AmneziaWG');
        startItem.connect('activate', () => {
            GLib.spawn_command_line_async('systemctl start awg-quick@wg0');
            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => { this._updateStatus(); return GLib.SOURCE_REMOVE; });
        });
        this.menu.addMenuItem(startItem);

        let stopItem = new PopupMenu.PopupMenuItem('Выключить AmneziaWG');
        stopItem.connect('activate', () => {
            GLib.spawn_command_line_async('systemctl stop awg-quick@wg0');
            GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => { this._updateStatus(); return GLib.SOURCE_REMOVE; });
        });
        this.menu.addMenuItem(stopItem);

        this._updateStatus();
        this._timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 2, () => {
            this._updateStatus();
            return GLib.SOURCE_CONTINUE;
        });
    }

    _updateStatus() {
        try {
            let [res, stdout, stderr, status] = GLib.spawn_command_line_sync('systemctl is-active awg-quick@wg0');
            let output = '';
            if (stdout) {
                output = new TextDecoder().decode(stdout).trim();
            }
            let isActive = (output === 'active');

            if (isActive) {
                // Включен — зеленый цвет
                this.icon.style = 'color: #00FF00;';
            } else {
                // Выключен — серый цвет
                this.icon.style = 'color: #888888;';
            }
        } catch (e) {
            logError(e);
        }
    }

    destroy() {
        if (this._timeoutId) {
            GLib.Source.remove(this._timeoutId);
        }
        super.destroy();
    }
});

export default class AmneziaExtension extends Extension {
    enable() {
        this._indicator = new AmneziaIndicator();
        Main.panel.addToStatusArea('amnezia-toggle', this._indicator);
    }
    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
EOF
