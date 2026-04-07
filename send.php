<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Neplatný požadavek.']);
    exit;
}

function clean(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$phone   = clean($_POST['phone']   ?? '');
$email   = clean($_POST['email']   ?? '');
$vehicle = clean($_POST['vehicle'] ?? '');
$extra   = clean($_POST['extra']   ?? '');
$consent = !empty($_POST['consent']);

$services = [];
if (isset($_POST['service']) && is_array($_POST['service'])) {
    foreach ($_POST['service'] as $s) {
        $services[] = clean($s);
    }
}

// Validation
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vyplňte prosím vaše jméno.']);
    exit;
}

if (empty($phone) && empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Zadejte prosím telefon nebo e-mail.']);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Neplatná e-mailová adresa.']);
    exit;
}

if (!$consent) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Pro odeslání je nutný souhlas se zpracováním osobních údajů.']);
    exit;
}

// Build email
$servicesStr = !empty($services) ? implode(', ', $services) : 'Neuvedeno';
$vehicleStr  = !empty($vehicle)  ? $vehicle                 : 'Neuvedeno';
$extraStr    = !empty($extra)    ? $extra                   : '—';

$body  = "Nová rezervace z webu Wash & Wrap\n";
$body .= "========================================\n\n";
$body .= "Jméno:    {$name}\n";
$body .= "Telefon:  " . (!empty($phone) ? $phone : '—') . "\n";
$body .= "E-mail:   " . (!empty($email) ? $email : '—') . "\n\n";
$body .= "Typ vozu: {$vehicleStr}\n";
$body .= "Služby:   {$servicesStr}\n\n";
$body .= "Extra požadavky:\n{$extraStr}\n";

$to      = 'info@washwrap.cz';
$subject = '=?UTF-8?B?' . base64_encode('Nová rezervace – ' . $name) . '?=';
$replyTo = !empty($email) ? $email : $to;

$headers  = "From: Wash & Wrap <noreply@washwrap.cz>\r\n";
$headers .= "Reply-To: {$replyTo}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Odesláno! Brzy vás budeme kontaktovat.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Odeslání se nezdařilo. Kontaktujte nás prosím přímo na ' . $to . '.']);
}
