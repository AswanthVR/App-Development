package com.app.service;

import com.app.entity.Payment;
import com.app.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);
        return paymentOptional.orElse(null);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);

        if (paymentOptional.isPresent()) {
            Payment existingPayment = paymentOptional.get();
            existingPayment.setOrderId(updatedPayment.getOrderId());
            existingPayment.setAmount(updatedPayment.getAmount());
            existingPayment.setPaymentType(updatedPayment.getPaymentType());
            existingPayment.setPaymentDate(updatedPayment.getPaymentDate());

            return paymentRepository.save(existingPayment);
        } else {
            return null;
        }
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
