package response;

import com.app.entity.Address;
import com.app.entity.enumerate.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long uid;
    private String name;
    private String email;
    private Boolean isEnabled;
    private String phone;
    private Role role;
//    private List<Address> address;
}