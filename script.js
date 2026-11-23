// ========================================================
// LOGIKA JAVASCRIPT - SISTEM INFORMASI KLINIK SEHAT SENTOSA
// File: script.js
// ========================================================

// 1. DATA MASTER AWAL (STATE)
let daftarPasien = [
  { rm: 'RM-2023-1482', nama: 'Hesti Widya', nik: '3171025501910003', gender: 'Perempuan', umur: '32 thn', telp: '0812-9988-7711' },
  { rm: 'RM-2023-1481', nama: 'Ahmad Rizki', nik: '3171021208960002', gender: 'Laki-laki', umur: '27 thn', telp: '0813-2233-4455' },
  { rm: 'RM-2023-1480', nama: 'Dewi Sartika', nik: '3171034405780001', gender: 'Perempuan', umur: '45 thn', telp: '0856-7788-9900' },
  { rm: 'RM-2023-1479', nama: 'Rian Pratama', nik: '3171011803040005', gender: 'Laki-laki', umur: '19 thn', telp: '0819-4455-6677' }
];

let daftarKunjungan = [
  { nama: 'Hesti Widya', poli: 'Poli Umum', keluhan: 'Demam tinggi & flu 3 hari', jam: '10:45 WIB', status: 'Selesai' },
  { nama: 'Ahmad Rizki', poli: 'Poli Gigi', keluhan: 'Pembersihan karang gigi', jam: '10:15 WIB', status: 'Diperiksa' },
  { nama: 'Dewi Sartika', poli: 'Poli Anak', keluhan: 'Imunisasi balita', jam: '09:30 WIB', status: 'Terdaftar' }
];

// 2. FUNGSI NAVIGASI HALAMAN (SINGLE PAGE APPLICATION)
function navigateTo(pageId) {
  // Sembunyikan semua section
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  
  // Tampilkan section yang dipilih
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update styling tombol menu sidebar
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.className = "nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium transition";
  });
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) {
    activeNav.className = "nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-600 text-white font-medium shadow-sm transition";
  }
}

// 3. RENDER TABEL PASIEN
function renderPasien(filteredList = null) {
  const list = filteredList || daftarPasien;
  const tbody = document.getElementById('tabel-body-pasien');
  if (!tbody) return;
  tbody.innerHTML = '';

  list.forEach(p => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-50 transition";
    tr.innerHTML = `
      <td class="py-3 px-6 font-semibold text-sky-600">${p.rm}</td>
      <td class="py-3 px-6 font-medium text-slate-900">${p.nama}</td>
      <td class="py-3 px-6 text-slate-500 font-mono text-xs">${p.nik}</td>
      <td class="py-3 px-6 text-slate-600">${p.gender} • ${p.umur}</td>
      <td class="py-3 px-6 text-slate-600">${p.telp}</td>
      <td class="py-3 px-6">
        <button data-rm="${p.rm}" class="btn-hapus text-rose-500 hover:text-rose-700 text-xs font-semibold">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Pasang listener untuk tombol hapus pasien
  document.querySelectorAll('.btn-hapus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rm = e.target.getAttribute('data-rm');
      hapusPasien(rm);
    });
  });

  const statPasien = document.getElementById('stat-total-pasien');
  if (statPasien) statPasien.innerText = daftarPasien.length + 1478;
}

// 4. RENDER TABEL KUNJUNGAN
function renderKunjungan() {
  const tbody = document.getElementById('tabel-body-kunjungan');
  if (!tbody) return;
  tbody.innerHTML = '';

  daftarKunjungan.forEach(k => {
    const badgeColor = k.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700' : 
                      (k.status === 'Diperiksa' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700');
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-50 transition";
    tr.innerHTML = `
      <td class="py-3 px-6 font-medium text-slate-900">${k.nama}</td>
      <td class="py-3 px-6 text-slate-600">${k.poli}</td>
      <td class="py-3 px-6 text-slate-500">${k.keluhan}</td>
      <td class="py-3 px-6 text-slate-500 text-xs">${k.jam}</td>
      <td class="py-3 px-6">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}">
          ${k.status}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const statKunjungan = document.getElementById('stat-kunjungan');
  if (statKunjungan) statKunjungan.innerText = daftarKunjungan.length + 39;
}

// 5. MODAL & HAPUS PASIEN
function bukaModalPasien() {
  document.getElementById('modal-pasien').classList.remove('hidden');
}

function tutupModalPasien() {
  document.getElementById('modal-pasien').classList.add('hidden');
}

function hapusPasien(rm) {
  if (confirm('Hapus pasien dengan No. RM: ' + rm + '?')) {
    daftarPasien = daftarPasien.filter(p => p.rm !== rm);
    renderPasien();
  }
}

// 6. INISIALISASI SEMUA EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {

  // Login Form Submission
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('view-login').classList.add('hidden');
      document.getElementById('view-app').classList.remove('hidden');
      renderPasien();
      renderKunjungan();
    });
  }

  // Tombol Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin keluar dari sistem?')) {
        document.getElementById('view-app').classList.add('hidden');
        document.getElementById('view-login').classList.remove('hidden');
      }
    });
  }

  // Navigasi Sidebar Menu
  const navItems = ['dashboard', 'pasien', 'kunjungan', 'rekap', 'akun'];
  navItems.forEach(id => {
    const el = document.getElementById('nav-' + id);
    if (el) el.addEventListener('click', () => navigateTo(id));
  });

  // Tombol Shortcut Cepat di Dashboard
  const btnGotoPasien = document.getElementById('btn-goto-pasien');
  if (btnGotoPasien) btnGotoPasien.addEventListener('click', () => navigateTo('pasien'));

  const btnGotoKunjungan = document.getElementById('btn-goto-kunjungan');
  if (btnGotoKunjungan) btnGotoKunjungan.addEventListener('click', () => navigateTo('kunjungan'));

  const btnGotoRekap = document.getElementById('btn-goto-rekap');
  if (btnGotoRekap) btnGotoRekap.addEventListener('click', () => navigateTo('rekap'));

  // Kontrol Modal Pasien
  const btnBukaModal = document.getElementById('btn-buka-modal-pasien');
  if (btnBukaModal) btnBukaModal.addEventListener('click', bukaModalPasien);

  const btnTutupX = document.getElementById('btn-tutup-modal-x');
  if (btnTutupX) btnTutupX.addEventListener('click', tutupModalPasien);

  const btnTutupBatal = document.getElementById('btn-tutup-modal-batal');
  if (btnTutupBatal) btnTutupBatal.addEventListener('click', tutupModalPasien);

  // Submit Pendaftaran Pasien Baru
  const formPasienBaru = document.getElementById('form-pasien-baru');
  if (formPasienBaru) {
    formPasienBaru.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('modal-nama').value;
      const nik = document.getElementById('modal-nik').value;
      const gender = document.getElementById('modal-gender').value;
      const umur = document.getElementById('modal-umur').value + ' thn';
      const telp = document.getElementById('modal-telp').value;
      const newRM = 'RM-2023-' + (1483 + daftarPasien.length);

      daftarPasien.unshift({ rm: newRM, nama, nik, gender, umur, telp });
      renderPasien();
      tutupModalPasien();
      alert('Pasien ' + nama + ' berhasil didaftarkan dengan No. RM: ' + newRM);
      formPasienBaru.reset();
    });
  }

  // Submit Pendaftaran Kunjungan Baru
  const formKunjungan = document.getElementById('form-kunjungan');
  if (formKunjungan) {
    formKunjungan.addEventListener('submit', (e) => {
      e.preventDefault();
      const pasienVal = document.getElementById('kunjungan-pasien').value;
      const nama = pasienVal.split(' (')[0];
      const poli = document.getElementById('kunjungan-poli').value;
      const keluhan = document.getElementById('kunjungan-keluhan').value;
      const now = new Date();
      const jam = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ' WIB';

      daftarKunjungan.unshift({ nama, poli, keluhan, jam, status: 'Terdaftar' });
      renderKunjungan();
      document.getElementById('kunjungan-keluhan').value = '';
      alert('Kunjungan pasien berhasil dicatat!');
    });
  }

  // Tombol Cetak / Print Laporan (PDF)
  const btnPrint = document.getElementById('btn-print-laporan');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  // Tombol Tambah Akun
  const btnTambahAkun = document.getElementById('btn-tambah-akun');
  if (btnTambahAkun) {
    btnTambahAkun.addEventListener('click', () => alert('Fitur tambah akun baru siap dikembangkan!'));
  }

  // Pencarian Real-Time di Header
  const globalSearch = document.getElementById('global-search');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const keyword = e.target.value;
      if (!keyword) {
        renderPasien();
        return;
      }
      const hasil = daftarPasien.filter(p => 
        p.nama.toLowerCase().includes(keyword.toLowerCase()) || 
        p.rm.toLowerCase().includes(keyword.toLowerCase())
      );
      navigateTo('pasien');
      renderPasien(hasil);
    });
  }

  // Render awal saat pertama kali dimuat
  renderPasien();
  renderKunjungan();
});